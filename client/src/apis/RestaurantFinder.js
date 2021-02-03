const RestaurantFinder = {};
const URL = "http://localhost:3500/api/v1/restaurants/"


RestaurantFinder.all = async () => {
     const response = await fetch(URL)
        return await response.json()
}

RestaurantFinder.byId = async (restaurant_id) => {
    const response = await fetch(URL + restaurant_id)
    return await response.json()
}

RestaurantFinder.add = async ({name, location, price_range }) => {
    const response = await fetch(URL, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, location, price_range })
    })
    return await response.json()
}

RestaurantFinder.delete = async (restaurant_id) => {
    const response = await fetch(URL + restaurant_id, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ })
    })
    return await response.json()
}

RestaurantFinder.update = async ({ id, name, location, price_range }) => {
    const response = await fetch(URL + id, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, location, price_range })
    })
    return await response.json()
}

RestaurantFinder.addReview = async ( restaurant_id, name, review, rating ) => {
    const response = await fetch(URL + restaurant_id + '/review', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, review, rating })
    })
    return await response.json()
}



export default RestaurantFinder;