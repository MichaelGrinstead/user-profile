export async function POST(req: Request, res: Response) {
  fetch("http://localhost:3000/users/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  });

  return res;
}
