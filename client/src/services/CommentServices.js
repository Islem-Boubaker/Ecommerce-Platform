export const createComment = async (comment) => {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/user/createcomment/:userId/:productId`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(comment),
        }
        );
    return response.data;
};

export const updateComment = async (comment) => {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/user/updatecomment/:id/:userId`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(comment),
        }
        );
    return response.data;
};

export const deleteComment = async () => {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/user/deletecomment/:id/:userId`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
          
        }
        );
    return response.data;
};

export const getComments = async () => {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/user/getcomment/:productId`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
        );
    return response.data;
};