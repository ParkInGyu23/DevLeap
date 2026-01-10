import { useWrite } from "../hooks/useWrite";

function Write() {
  const { forms, handleFileChange, handleChangeInput, handleWrite } =
    useWrite();

  return (
    <main className="page__main">
      <div className="page__write">
        <h2 className="page__write-text">새로운 글 작성</h2>
        <form onSubmit={handleWrite}>
          <div className="page__write-form">
            <div className="page__write-group">
              <label htmlFor="title" className="page__write-label">
                제목
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="page__write-input"
                placeholder="Type product name"
                required
                value={forms.title}
                onChange={handleChangeInput("title")}
              />
            </div>
            <div>
              <label htmlFor="category" className="page__write-label">
                카테고리
              </label>
              <select
                id="category"
                className="page__write-select"
                required
                value={forms.category}
                onChange={handleChangeInput("category")}
              >
                <option value="">Select category</option>
                <option value="Travel">Travel</option>
                <option value="Food">Food</option>
                <option value="Life">Life</option>
              </select>
            </div>
            <div>
              <label htmlFor="writer" className="page__write-label">
                작성자
              </label>
              <input
                type="text"
                name="writer"
                id="writer"
                className="page__write-input"
                placeholder="Type product name"
                required
                value={forms.username}
                onChange={handleChangeInput("username")}
              />
            </div>
            <div className="page__write-group">
              <div>
                <label htmlFor="item-weight" className="page__write-label">
                  썸네일
                </label>
                <label
                  className="page__write-file--hidden"
                  htmlFor="user_avatar"
                >
                  Upload file
                </label>
                <input
                  className="page__write-file"
                  aria-describedby="user_avatar_help"
                  id="user_avatar"
                  type="file"
                  accept="image/*"
                  required
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="page__write-group">
              <label htmlFor="description" className="page__write-label">
                내용
              </label>
              <textarea
                id="description"
                className="page__write-textarea"
                placeholder="Your description here"
                required
                value={forms.desc}
                onChange={handleChangeInput("desc")}
              ></textarea>
            </div>
          </div>
          <button type="submit" className="page--btn">
            글등록
          </button>
        </form>
      </div>
    </main>
  );
}

export default Write;
