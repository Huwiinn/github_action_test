// 최상위 경로에 dummy.json을 생성하는 예시 Node.js 스크립트

const fs = require('fs');
const path = require('path');

const testFn = () => {
  // 1) 더미 데이터 생성
  const dummyData = [
    { name: "John Doe", age: 30 },
    { name: "Jane Smith", age: 25 },
    { name: "Sam Anonymous", age: 40 }
  ];

  // 2) 프로젝트 최상위(dummy.json) 경로 설정
  const filePath = path.join(__dirname, 'dummy.json');

  // 3) JSON 파일 쓰기
  fs.writeFileSync(
    filePath,
    JSON.stringify(dummyData, null, 2),  // pretty-print 들여쓰기 2칸
    'utf8'
  );

  console.log(`✅ dummy.json 파일이 생성되었습니다: ${filePath}`);
  console.log('테스트 스크립트 함수가 실행되었습니다.');
  return "스크립트 실행완료";
}

testFn();
