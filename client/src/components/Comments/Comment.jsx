import "./comment.css";

const Comment = (props) => {
  return (
    <div className="comment-container">
      <p
        className="user"
        style={{ fontWeight: "800", fontSize: ".8rem", marginTop: ".4rem" }}
      >
        user{props.userId.substring(15, props.userId.length)}
      </p>
      <div className="comment-body">{props.commentBody}</div>
    </div>
  );
};

export default Comment;
