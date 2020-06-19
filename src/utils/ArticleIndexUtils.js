const createIndex = (input_html) => {
    let tables = []
    const result = input_html.replace(/<(h\d).*?>.*?<\/h\d>/g, (match, tag) => {
        const hash = match.replace(/<.*?>/g, '')
        tables.push({hash, tag})
        return `<a  class="article_h1" href="#${hash}" id="${hash}">${match}</a>`
    })
    return {
        tables, result
    }
}


export default createIndex