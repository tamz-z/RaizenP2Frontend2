import PostList from "../components/PostList";
import SuggestedUsers from "../components/SuggestedUsers";

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      <div className="flex gap-10">
        <div className="flex-2">
        <h1 className="text-3xl font-bold mb-6">Home blob</h1>
          {/* <PostList /> */}
        </div>
        <div className="hidden lg:block flex-1 max-w-xs">
          {/* <SuggestedUsers /> */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
