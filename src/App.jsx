import { use, useEffect, useState } from "react";
import "./App.css";
const url = "https://dummyjson.com/products";

const FetchAPI = async (page, limit, search) => {
  try {
    const res = await fetch(
      `${url}/search?q=${search}&limit=${limit}&skip=${(page - 1) * limit}`
      // https://dummyjson.com/products/search?q=${searchQuery}&limit=${limit}&skip=${skip}
    );
    const data = await res.json();
    return data.products;
  } catch (error) {
    console.log(error);
  }
};

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await FetchAPI(page, limit, search);
      setProducts(res);
    };
    fetchData();
  }, [page, limit, search]);
  console.log(search);
  const handlePage = (data) => {
    console.log(data);
    if (data === "pre") {
      setPage(page - 1);
    } else if (data === "next") {
      setPage(page + 1);
    }
  };

  const handleLimit = (limit) => {
    setLimit(limit);
  };

  const filterSort = (() => {
    let filtered = products;
    // .filter((item) =>
    //   item.title.toLowerCase().includes(search.toLowerCase())
    // );

    if (sort === "asc") {
      return [...filtered].sort((a, b) => a.price - b.price);
    }
    if (sort === "desc") {
      return [...filtered].sort((a, b) => b.price - a.price);
    }
    return filtered;
  })();

  return (
    <>
      <h1>Danh sách</h1>
      <div className="controls">
        <select onChange={(e) => handleLimit(e.target.value)}>
          <option value="12">SET_LIMIT (12)</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="50">50</option>
        </select>
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="">Sắp xếp</option>
          <option value="desc">⬇️ Giảm dần</option>
          <option value="asc">⬆️ Tăng dần</option>
        </select>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm sản phẩm..."
        />
      </div>
      <div className="product-list">
        {filterSort.map((item) => (
          <div key={item.id} className="product-item">
            <img src={item.thumbnail} alt={item.title} />
            <p>
              {item.id} - {item.title}
            </p>
            <p className="price">${item.price}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => handlePage("pre")} disabled={page === 1}>
          Pre
        </button>
        <span>Trang {page}</span>
        <button onClick={() => handlePage("next")}>Next</button>
      </div>
    </>
  );
}
export default App;
