import React, { useState } from "react";
import { supabase } from "../config/supabase";
import PostList from "../components/PostList";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("users"); // or "posts"
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      if (searchType === "users") {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .ilike("username", `%${query}%`);
        if (error) throw error;
        setResults(data);
      } else if (searchType === "posts") {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .ilike("content", `%${query}%`);
        if (error) throw error;
        setResults(data);
      }
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Zoeken</h2>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Zoekterm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow border border-gray-300 rounded px-3 py-2"
        />
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="users">Gebruikers</option>
          <option value="posts">Berichten</option>
        </select>
        <button
          onClick={handleSearch}
          disabled={loading || !query.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Zoeken..." : "Zoeken"}
        </button>
      </div>
      <div>
        {searchType === "users" ? (
          <ul>
            {results.map((user) => (
              <li key={user.id} className="border-b py-2">
                <strong>{user.username}</strong> - {user.fullName}
              </li>
            ))}
          </ul>
        ) : (
          <PostList posts={results} onAddPost={() => {}} onLike={() => {}} onDeletePost={() => {}} />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
