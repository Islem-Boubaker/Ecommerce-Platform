export const createComment = async (comment, userId, productId) => {
 
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/createcomment/${productId}/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      return { ok: false, status: response.status, message: (data && (data.message || data.error)) || "Request failed" };
    }
    return { ok: true, status: response.status, data };
  } catch (err) {
    return { ok: false, status: 0, message: err.message || "Network error" };
  }
};

export const updateComment = async (comment,editText) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/user/updatecomment/${comment._id}/${comment.userId}/`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment: editText }),  
    }
  );
  const data = await response.json();
  if (!response.ok) {
    return { ok: false, status: response.status, message: (data && (data.message || data.error)) || "Request failed" };
  }
  return { ok: true, status: response.status, data };
};

export const deleteComment = async (comment) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/user/deletecomment/${comment._id}/${comment.userId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    return { ok: false, status: response.status, message: (data && (data.message || data.error)) || "Request failed" };
  }
  return { ok: true, status: response.status, data };
};

export const getComments = async (productId) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/user/getcomment/${productId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
};
