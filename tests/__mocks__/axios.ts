const post = jest.fn();
const create = jest.fn(() => ({ post }));

export default { create };
export const __axiosPost = post;
