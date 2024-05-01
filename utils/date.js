const date = (props) => {
  const timestamp = props;
  const date = new Date(timestamp * 1000);
  const sliceDate = date.toISOString().slice(0, 10);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const week = date.getDay();
  const WEEKDAY = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];

  const koDate = `${+month}월 ${+day}일`;
  return { date: sliceDate, koDate, weekday: WEEKDAY[week] };
};

export default date;
