import { createContentLoader } from 'vitepress'
const contentLoaderConfig = {
    includeSrc: true,
    render: true,
    excerpt: true,
    transform(rawData) {
        return rawData.sort((a, b) => {
            return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
        }).map((page) => {
            // 大纲
            const headings = []
            if (page.html) {
                // 使用正则匹配所有标题标签
                const headingRegex = /<h([1-5]) id="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/gi
                let match
                while ((match = headingRegex.exec(page.html)) !== null) {
                    headings.push({
                        level: parseInt(match[1]),
                        text: match[3].replace(/<[^>]+>/g, '').replace('&ZeroWidthSpace;', '').trim(), // 移除标签内嵌元素
                        anchor: `#${match[2]}`,
                        link: `${page.url}#${match[2]}`
                    })
                }
            }
            // 摘要处理
            let excerpt = page.excerpt
            if (true) {
                const plainText = page.src
                    .replace(/^---[\s\S]*?---/, '')
                    .replace(/(```[\s\S]*?```|#+\s+|\[.*?\]\(.*?\))/g, '')
                    .substring(0, 30)
                excerpt = plainText + (plainText.length >= 30 ? '......' : '')
                excerpt = excerpt.trim()
            }
            return {
                headings: headings,
                title: page.frontmatter.title,
                date: page.frontmatter.date,
                link: page.url,
                excerpt: excerpt,
                tags: (page.frontmatter.tags?.split(/[,\s]+/) ?? []).map(tag => tag.trim()),
                categories: (page.frontmatter.categories?.split(',') ?? []).map(category => category.trim()),
                cover: page.frontmatter.cover || ''  // 封面图也添加默认值
            }
        })
    }
}

export default createContentLoader('posts/**/*.md', contentLoaderConfig)