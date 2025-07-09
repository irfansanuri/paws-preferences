const endpoint:string = 'https://cataas.com';
const skip = Math.floor(Math.random() * 300);
const limit = Math.floor(Math.random() * 11) + 10;

export const catEndpoint:{collections:string, image:string} = {
    collections: `${endpoint}/api/cats?type=square&tags=cute&skip=${skip}&limit=${limit}`,
    image: `${endpoint}/cat`
}