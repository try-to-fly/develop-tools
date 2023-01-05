import got from "got";

const url = "https://api.notion.com/v1/pages";

export const postNotion = async ({ data, token }: { data: Object; token: string }) => {
  console.log('token', token);
  console.log("提交数据", JSON.stringify(data));
  try {
    await got.post(url, {
      json: data,
      // 60s
      timeout: 60000,
      headers: {
        Authorization: `Bearer ${token}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
    });
    console.log("提交成功");

    return true;
  } catch (error) {
    console.error("提交失败", error);
    return false;
  }
};
