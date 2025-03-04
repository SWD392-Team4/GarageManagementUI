// pages/Chat/partials/ChatSearch.jsx
import React, { useState } from "react";

function ChatSearch() {
  const [keyword, setKeyword] = useState("");

  // Tạm thời: console.log hoặc callback
  // Thực tế: Gọi store filter, v.v.
  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <input
      className="border  px-2 py-1 w-full outline-none"
      type="text"
      placeholder="Search . . . "
      value={keyword}
      onChange={handleSearch}
    />
  );
}

export default ChatSearch;
