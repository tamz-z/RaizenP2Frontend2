import React, { useState } from "react";
import Post from "./Post";
import { supabase } from "../config/supabase";

export default function PostList({ posts, onAddPost, onLike, onDeletePost }) {
    const [newPost, setNewPost] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => setSelectedImage(reader.result);
        reader.readAsDataURL(file);
    };

    const dataURLtoBlob = (dataURL) => {
        const byteString = atob(dataURL.split(",")[1]);
        const mime = dataURL.split(",")[0].split(":")[1].split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
        return new Blob([ab], { type: mime });
    };

    const uploadImageAndPost = async () => {
        setUploading(true);
        let imageUrl = null;

        try {
            console.log("→ uploadImageAndPost gestart", { newPost, selectedImage });
            if (selectedImage) {
                const fileName = `post-${Date.now()}.png`;
                console.log("Upload afbeelding naar bucket:", fileName);
                const { error: uploadErr } = await supabase.storage
                    .from("post-images")
                    .upload(fileName, dataURLtoBlob(selectedImage));
                if (uploadErr) throw uploadErr;

                const { data } = supabase.storage
                    .from("post-images")
                    .getPublicUrl(fileName);
                imageUrl = data.publicUrl;
                console.log("Afbeelding geüpload, url:", imageUrl);
            }

            await onAddPost(newPost, imageUrl);
        } catch (err) {
            console.error("❌ uploadImageAndPost error:", err);
        } finally {
            setUploading(false);
            setNewPost("");
            setSelectedImage(null);
        }
    };

    return (
        <div>
            <div className="p-4 border-b">
        <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Wat wil je delen?"
        />
                <input type="file" accept="image/*" onChange={handleImageChange} disabled={uploading} />
                {selectedImage && <img src={selectedImage} alt="preview" style={{ maxHeight: 150 }} />}
                <button disabled={uploading || (!newPost && !selectedImage)} onClick={uploadImageAndPost}>
                    {uploading ? "Bezig..." : "Plaatsen"}
                </button>
            </div>
            <div>
                {posts.map((post) => (
                    <Post key={post.id} post={post} onLike={onLike} onDeletePost={onDeletePost} />
                ))}
            </div>
        </div>
    );
}
