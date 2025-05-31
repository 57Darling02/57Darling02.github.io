import { createContentLoader } from 'vitepress'
const contentLoaderConfig = {
    includeSrc: true,
    render: true,
    excerpt: true,
    transform(rawData) {
        return rawData.sort((a, b) => {
            return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
        }).map((page) => {
            // 摘要处理
            let excerpt = page.excerpt
            let textNum = 0
            if (true) {
                const plainText = page.src
                    .replace(/^---[\s\S]*?---/, '')
                    .replace(/(```[\s\S]*?```|#+\s+|\[.*?\]\(.*?\))/g, '')
                    .substring(0, 30)
                excerpt = plainText + (plainText.length >= 30 ? '......' : '')
                excerpt = excerpt.trim()
                textNum = page.src.length
            }
            return {
                title: page.frontmatter.title,
                date: page.frontmatter.date,
                link: page.url,
                excerpt: excerpt,
                tags: (page.frontmatter.tags?.split(/[,\s]+/) ?? []).map(tag => tag.trim()),
                categories: (page.frontmatter.categories?.split(',') ?? []).map(category => category.trim()),
                cover: page.frontmatter.cover || '' , 
                lastUpdated: page.lastUpdated || page.frontmatter.date || '',
                textNum,
            }
        })
    }
}
// export const data = createContentLoader('posts/**/*.md', contentLoaderConfig)
export default createContentLoader('posts/**/*.md', contentLoaderConfig)

interface Node {
    children: Node[];
    label: string;
    value: string;
    level: number;
}
function getHeaders(range: any,document: Document) {
    if (range === false) {
        return [];
    }
    const headers = [
        ...document.querySelectorAll('.vp-doc :where(h1,h2,h3,h4,h5,h6)')
    ]
        .filter((el) => el.id && el.hasChildNodes())
        .map((el) => {
            const level = Number(el.tagName[1]);
            return {
                label: serializeHeader(el),
                value: '#' + el.id,
                level,
                children: [],
            } as Node;
        });

    // return headers
    return resolveHeaders(headers, range);
}
function serializeHeader(h: Element) {
    let ret = '';
    for (const node of h.childNodes) {
        if (node.nodeType === 1) {
            ret += node.textContent;
        }
        else if (node.nodeType === 3) {
            ret += node.textContent;
        }
    }
    return ret.trim();
}
function resolveHeaders(headers, range) {
    const levelsRange = (typeof range === 'object' && !Array.isArray(range)
        ? range.level
        : range) || 2;
    const [high, low] = typeof levelsRange === 'number'
        ? [levelsRange, levelsRange]
        : levelsRange === 'deep'
            ? [2, 6]
            : levelsRange;
    return buildTree(headers, high, low);
}
function buildTree(data: Node[], min: number, max: number) {
    const result: Node[] = [];
    const stack: Node[] = [];
    data.forEach((item) => {
        const node: Node = item as Node;
        let parent = stack[stack.length - 1];
        while (parent && parent.level >= node.level) {
            stack.pop();
            parent = stack[stack.length - 1];
        }
        if (node.level > max || node.level < min)
            return;
        if (parent)
            parent.children.push(node);
        else
            result.push(node);
        stack.push(node);
    });
    return result;
}