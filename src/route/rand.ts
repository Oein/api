import type { Q, S } from "@api";

export function get(req: Q, res: S) {
  const len = (req.query.len as string) || "32";
  const lenNum = parseInt(len);
  const chars =
    (req.query.chars as string) ||
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charsArr = chars.split("");
  let result = "";
  for (let i = 0; i < lenNum; i++) {
    result += charsArr[Math.floor(Math.random() * charsArr.length)];
  }
  res.send(result);
}
