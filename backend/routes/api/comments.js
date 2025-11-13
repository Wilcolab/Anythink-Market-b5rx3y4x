/**
 * Express router for comment-related API endpoints.
 *
 * @module routes/api/comments
 *
 * @requires express.Router
 * @requires mongoose.model.Comment
 *
 * @description
 * Exposes endpoints to fetch comments for a given item and to delete a specific comment.
 * The router expects an authenticated user on `req.user`:
 * - GET /comments/:itemId does not require ownership but uses `req.user` when serializing comments via comment.toJSONFor(req.user).
 * - DELETE /comments/:commentId requires that `req.user._id` matches the comment.seller for authorization.
 *
 * Routes:
 *
 * GET /comments/:itemId
 *   - Description: Retrieve all comments for the specified item.
 *   - Path parameters:
 *     - {string} itemId - The ObjectId of the item whose comments should be returned.
 *   - Success response (200):
 *     - Content: { comments: Array<Object> } where each comment object is produced by comment.toJSONFor(req.user).
 *   - Errors:
 *     - Any database or unexpected error is forwarded to next(err).
 *
 * DELETE /comments/:commentId
 *   - Description: Delete the specified comment. Only the user who is the seller of the comment may delete it.
 *   - Path parameters:
 *     - {string} commentId - The ObjectId of the comment to delete.
 *   - Authorization:
 *     - Requires an authenticated user on `req.user`. Deletion is permitted only if comment.seller.toString() === req.user._id.toString().
 *   - Success response (200):
 *     - Content: { message: "Comment deleted successfully" }
 *   - Client errors:
 *     - 404 Not Found: { error: "Comment not found" } if no comment exists with the given id.
 *     - 403 Forbidden: { error: "You are not authorized to delete this comment" } if the authenticated user is not the seller.
 *   - Errors:
 *     - Any database or unexpected error is forwarded to next(err).
 *
 * Implementation notes:
 *   - Comments are fetched via mongoose Comment model.
 *   - .populate("seller") is used when fetching comments to ensure seller information is available for serialization/authorization.
 *   - Deletion uses comment.remove() and relies on Mongoose document removal semantics.
 */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;

router.get("/comments/:itemId", async (req, res, next) => {
  try {
    const comments = await Comment.find({ item: req.params.itemId })
      .populate("seller")
      .exec();
    return res.json({
      comments: comments.map(comment => comment.toJSONFor(req.user))
    });
  } catch (err) {
    return next(err);
  }
});

// add another endpoint for deleting a comment
router.delete("/comments/:commentId", async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId).exec();
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    // Check if the requesting user is the seller of the comment
    if (comment.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "You are not authorized to delete this comment" });
    }
    await comment.remove();
    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    return next(err);
  }
});
