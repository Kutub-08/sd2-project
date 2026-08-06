export async function setup() {
  process.env.NODE_ENV = "test";
  process.env.ACCESS_TOKEN_SECRET = "test-access-secret-0123456789abcdef0123456789abcdef";
  process.env.REFRESH_TOKEN_SECRET = "test-refresh-secret-0123456789abcdef0123456789abcdef";
}

export default setup;
