const url = 'https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json'
async function getResponse() {
    let response = await fetch(url)
    // let content = await response.json()
    console.log(response)
}
getResponse()
