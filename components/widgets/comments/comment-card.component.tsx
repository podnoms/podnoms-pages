import React from "react";
import { Comment, User } from "../../../models";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface ICommentCardComponentProps {
  comment: Comment;
  currentUser: User;
  updateComment: (id: string, comment: any) => void;
  deleteComment: (id: string) => void;
}

const CommentCardComponent: React.FC<ICommentCardComponentProps> = ({
  comment,
  currentUser,
  updateComment,
  deleteComment,
}) => {
  const [editing, setEditing] = React.useState(false);
  const [text, setText] = React.useState(comment?.content);

  const handleUpvote = () => {
    console.log("comment-card.component", "handleUpvote");
  };
  const handleDownvote = () => {
    console.log("comment-card.component", "handleDownvote");
  };
  const formatDate = (timestamp: Date) => {
    return "some/date/year";
  };
  const handleReply = () => {
    updateComment(comment.id, {
      addReply: true,
      replyingTo: { username: comment.user.username, id: comment.parentId },
    });
  };
  return comment && currentUser ? (
    <div className="flex flex-col-reverse self-center w-full p-2 mb-4 bg-white rounded-md card sm:p-6 sm:flex-row">
      <div className="flex items-center justify-between m-2 sm:items-start sm:m-0">
        <div className="flex items-center justify-around w-24 h-10 rounded-lg sm:w-11 sm:h-22 sm:flex-col sm:py-12 sm:px-2 sm:ml-0 sm:mt-0 bg-neutral-very-light-grey">
          <div
            className="p-1 group hover:cursor-pointer"
            onClick={handleUpvote}
          >
            <AiOutlinePlus className="fill-[#C5C6EF] group-hover:fill-primary-moderate-blue overflow-visible" />
          </div>
          <div className="my-4 text-primary-moderate-blue">{comment.score}</div>
          <div
            className="p-1 group hover:cursor-pointer"
            onClick={handleDownvote}
          >
            <AiOutlineMinus className="fill-[#C5C6EF] group-hover:fill-primary-moderate-blue overflow-visible" />
          </div>
        </div>

        <div className="sm:hidden">{/* <CommentActions /> */}</div>
      </div>

      <div className="flex flex-col w-full ml-4">
        <div className="flex flex-row flex-wrap items-center mb-4">
          {/* <img
            className="w-10 h-10 mr-4 rounded-full"
            src={require(`./../../assets/interactive-comments-section${comment.user.image.webp.substring(
              1
            )}`)}
            alt="avatar"
          /> */}
          <h1 className="mr-4 h-fit">{comment.user.username}</h1>
          {currentUser.username === comment.user.username && (
            <div className="bg-primary-moderate-blue text-white px-2 py-[1px] text-sm rounded-sm mr-4">
              you
            </div>
          )}
          <div className="flex-1 h-fit min-h-fit opacity-60">
            {formatDate(comment.createdAt)}
          </div>
          <div className="hidden sm:flex">{/* <CommentActions /> */}</div>
        </div>

        <div className="flex flex-col">
          {editing ? (
            <div className="flex flex-col">
              <textarea
                autoFocus
                key="edit"
                rows={4}
                className="mb-2 border-2 rounded-md resize-none opacity-70 w-100 border-primary-moderate-blue"
                value={`${
                  comment.replyingTo ? `@${comment.replyingTo} ${text}` : text
                }`}
                onChange={(e) => {
                  setText(
                    comment.replyingTo
                      ? e.target.value.substring(
                          comment.replyingTo.username.length + 2
                        )
                      : e.target.value
                  );
                }}
                onFocus={function (e) {
                  var val = e.target.value;
                  e.target.value = "";
                  e.target.value = val;
                }}
              />
              <button
                className="self-end h-12 text-white rounded-lg bg-primary-moderate-blue w-36 hover:opacity-50"
                onClick={() => {
                  updateComment(comment.id, { content: text });
                  setEditing(false);
                }}
              >
                UPDATE
              </button>
            </div>
          ) : comment.content ? (
            <div className="opacity-70">
              {comment.replyingTo && (
                <div className="font-semibold text-primary-bright-blue contents">
                  @{comment.replyingTo.username}
                </div>
              )}
              {comment.content}
            </div>
          ) : (
            <div className="flex flex-col">
              <textarea
                key="reply"
                rows={4}
                className="mb-2 border-2 rounded-md resize-none opacity-70 w-100 border-primary-moderate-blue"
                value={`${
                  comment.replyingTo ? `@${comment.replyingTo} ${text}` : text
                }`}
                onChange={(e) => {
                  setText(
                    comment.replyingTo
                      ? e.target.value.substring(
                          comment.replyingTo.username.length + 2
                        )
                      : ""
                  );
                }}
                onFocus={function (e) {
                  var val = e.target.value;
                  e.target.value = "";
                  e.target.value = val;
                }}
              />
              <button
                className="self-end h-12 text-white rounded-lg bg-primary-moderate-blue w-36 hover:opacity-50"
                onClick={() => updateComment(comment.id, { content: text })}
              >
                REPLY
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div>No Comment</div>
  );
};
export default CommentCardComponent;
