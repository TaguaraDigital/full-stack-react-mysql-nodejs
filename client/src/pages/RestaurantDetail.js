import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantFinder from "../apis/RestaurantFinder";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReviews";
import StarRating from "../components/StarRating";

const RestaurantDetail = () => {
    const { id } = useParams();
    const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);

    useEffect(() => {
        const fetchData = async () => {
            const response = await RestaurantFinder.byId(id);
            setSelectedRestaurant(response.data);
        };
    
        fetchData();
    }, []);
    

    return (
        <div>
            {
                selectedRestaurant && <>
                    <h1 className="text-center display-1">
                        { selectedRestaurant.restaurant[0].name }
                    </h1>

                    <div className="text-center">
                        <StarRating rating={selectedRestaurant.restaurant[0].average_rating} />
                        <span className="text-warning ml-1">
                          {selectedRestaurant.restaurant[0].count
                            ? `(${selectedRestaurant.restaurant[0].count})`
                            : "(0)"}
                        </span>
                    </div>

                    <div className="mt-3">
                        <Reviews reviews={selectedRestaurant.reviews} />
                    </div>

                    <AddReview restId={id} /> 
                </>
            }                     
        </div>
    )
}

export default RestaurantDetail
