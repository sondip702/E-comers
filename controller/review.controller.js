import Review from '../model/review.model.js';


export const addOrUpdateReview = async (req, res) => {
    try {
        const { productId } = req.params;
        const { review, rating, comment } = req.body;
        const userId = req.user.id;
        if (!review || !rating || rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }
        const product = await Review.findById(productId);
        if (!Review) {
            return res.status(404).json({ message: 'Product not found' });
        }
        let reviewt = await Review.findOne({ Review: productId, user: userId });
        if (reviewt) {
            reviewt.rating = rating;
            reviewt.comment = comment;
            await reviewt.save();
            return res.status(200).json({ message: 'Review updated', review });
        } else {
            reviewt = new Review({
                product: productId,
                user: userId,
                review,
                rating,
                comment,
                shop: req.body.shop 
            });
            await reviewt.save();
            return res.status(201).json({ message: 'Review added', review });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const getReviewsForProduct = async (req, res) => {
    try{
        const { productId } = req.params;
        const reviews = await Review.find({ product:productId });
        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ message: 'No reviews found for this product' });
        }
        res.status(200).json({ message: 'Reviews fetched', reviews });

    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const userId = req.user.id;

        const review = await Review.findById(reviewId);
        
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        if (review.user.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        await Review.findByIdAndDelete(reviewId);
        res.status(200).json({ message: 'Review deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

