// 최상위 경로에 dummy.json을 생성하는 예시 Node.js 스크립트
const fs = require('fs');
const path = require('path');

// const testFn = () => {
//   // 1) 더미 데이터 생성
//   const dummyData = [
//     { name: "John Doe", age: 30 + Math.random() },
//     { name: "Jane Smith", age: 25 + Math.random() },
//     { name: "Sam Anonymous", age: 40 + Math.random() }
//   ];
//
//   // 2) 프로젝트 최상위(dummy.json) 경로 설정
//   const filePath = path.join(__dirname, 'dummy.json');
//
//   // 3) JSON 파일 쓰기
//   fs.writeFileSync(
//     filePath,
//     JSON.stringify(dummyData, null, 2),  // pretty-print 들여쓰기 2칸
//     'utf8'
//   );
//
//   console.log(`✅ dummy.json 파일이 생성되었습니다: ${filePath}`);
//   console.log('테스트 스크립트 함수가 실행되었습니다.');
//   return "스크립트 실행완료";
// }
//
// testFn();

// ------------ 개별 스크립트
// desktop 관련 코드는 주석

// const fs = require('fs');
// const path = require("path");
const key = process.env.PAGE_SPEED_INSIGHT_KEY;
const currentDirPath = __dirname;

const homepageList = [
  {
    index: 1,
    isMajor: true,
    name: '대표',
    domain: '/'
  },
  {
    index: 2,
    isMajor: true,
    name: '형사',
    domain: 'detective'
  },
  {
    index: 3,
    isMajor: false,
    name: '성범죄',
    domain: 'assault'
  },
  {
    index: 4,
    isMajor: false,
    name: '학교폭력',
    domain: 'school'
  },
  {
    index: 5,
    isMajor: true,
    name: '기업법무',
    domain: 'comp'
  },
  {
    index: 6,
    isMajor: true,
    name: '이혼',
    domain: 'divorce'
  },
  {
    index: 7,
    isMajor: false,
    name: '상속・가사',
    domain: 'inherit'
  },
  {
    index: 8,
    isMajor: false,
    name: '건설・부동산',
    domain: 'estate'
  },
  {
    index: 9,
    isMajor: false,
    name: '일반소송・중재',
    domain: 'compensation'
  },
  {
    index: 10,
    isMajor: false,
    name: '헌법행정',
    domain: 'administration'
  },
  {
    index: 11,
    isMajor: false,
    name: '법인회생파산',
    domain: 'regener'
  },
  {
    index: 12,
    isMajor: false,
    name: '금융・보험',
    domain: 'finance'
  },
  {
    index: 13,
    isMajor: false,
    name: '조세',
    domain: 'tax'
  },
  {
    index: 14,
    isMajor: false,
    name: '마약',
    domain: 'drug'
  },
  {
    index: 15,
    isMajor: false,
    name: '지식재산권',
    domain: 'iprs'
  },
  {
    index: 16,
    isMajor: false,
    name: '증거조사・디지털포렌식・경호',
    domain: 'discovery'
  },
  {
    index: 17,
    isMajor: false,
    name: '노동・산재',
    domain: 'labor'
  },
  {
    index: 18,
    isMajor: false,
    name: '국방군사',
    domain: 'military'
  },
  {
    index: 19,
    isMajor: false,
    name: '의료제약',
    domain: 'medical'
  },
  {
    index: 20,
    isMajor: false,
    name: '음주교통사고',
    domain: 'traffic'
  },
  {
    index: 21,
    isMajor: false,
    name: '관세・국제통상・이민',
    domain: 'international'
  },
  {
    index: 22,
    isMajor: false,
    name: 'M&A',
    domain: 'mergers'
  },
  {
    index: 23,
    isMajor: false,
    name: '상담전담센터',
    domain: 'consulting'
  },
  {
    index: 24,
    isMajor: false,
    name: '회계감리',
    domain: 'audit'
  },
  {
    index: 25,
    isMajor: false,
    name: '엔터테인먼트・스포츠',
    domain: 'entertainment'
  },
  {
    index: 26,
    isMajor: false,
    name: '공정거래',
    domain: 'trade'
  },
  {
    index: 27,
    isMajor: false,
    name: '산업안전・중대재해',
    domain: 'sapa'
  },
  {
    index: 28,
    isMajor: false,
    name: '채권추심',
    domain: 'debtcollection'
  }
]

const mobileFailedGroups = [];

const getPageSpeedInsight = async (group, isMobile = true) => {
  try {
    const PAGE_SPEED_URL = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed`;
    const targetDomainUrl = group.domain !== '/' ? `https://www.daeryunlaw-${group.domain}.com` : 'https://www.daeryunlaw.com';
    const reqUrl= isMobile ? `${PAGE_SPEED_URL}?url=${targetDomainUrl}&key=${key}&strategy=mobile` : `${PAGE_SPEED_URL}?url=${targetDomainUrl}&key=${key}`;
    const res = await fetch(reqUrl);
    const resResult = await res.json();

    // 실제 사용자 경험 데이터
    const clsScore = resResult.loadingExperience ? resResult.loadingExperience.metrics?.CUMULATIVE_LAYOUT_SHIFT_SCORE?.category : undefined;
    const ttfbScore = resResult.loadingExperience ? resResult.loadingExperience.metrics?.EXPERIMENTAL_TIME_TO_FIRST_BYTE?.category : undefined;
    const fcpScore = resResult.loadingExperience ? resResult.loadingExperience.metrics?.FIRST_CONTENTFUL_PAINT_MS?.category : undefined;
    const inpScore = resResult.loadingExperience ? resResult.loadingExperience.metrics?.INTERACTION_TO_NEXT_PAINT?.category : undefined;
    const lcpScore = resResult.loadingExperience ? resResult.loadingExperience.metrics?.LARGEST_CONTENTFUL_PAINT_MS?.category : undefined;

    // json 필요한 데이터만 뽑아서 재가공
    const result = {
      index: group.index,
      url: resResult.id,
      score: Math.round((resResult.lighthouseResult.categories.performance.score) * 100),
      majorGroup: group.isMajor,
      name: group.name,
      crux: {
        CLS: clsScore,
        TTFB: ttfbScore,
        FCP: fcpScore,
        INP: inpScore,
        LCP: lcpScore,
      }
    }

    // console.log('현재 실패그룹 : ', mobileFailedGroups);
    // console.log('현재 실패그룹 개수 ', mobileFailedGroups.length)
    // 실패그룹 초기화, while 재귀 방지
    if(mobileFailedGroups.length > 0) {
      const filteredList = mobileFailedGroups.filter((item) => group.name !== item.name);

      mobileFailedGroups.splice(0, mobileFailedGroups.length);
      mobileFailedGroups.push(...filteredList);
    }

    return result;

  } catch (error) {
    console.error(`${group.domain} 그룹 PageSpeedInsight API 결과를 받아오지 못했습니다. Error: ${error}`);
    console.log('실패 그룹 : ', group);

    mobileFailedGroups.push(group);

    return undefined;
  }
}


const createResultJsonFile = async () => {
  try {
    // desktop
    // const resultList: IPageSpeedInsightProps[] = await Promise.all(
    //     homepageList.map((group, index) => getPageSpeedInsight(group.domain, index)) as []
    // );

    // const mobileResultList: IPageSpeedInsightProps[] = await Promise.all(
    //     homepageList.map((group, index) => getPageSpeedInsight(group.domain, index, true)) as []
    // );

    const mobileResultList = await Promise.all(
        homepageList.map((group, index) => getPageSpeedInsight(group, true))
  );

    const failedGroupsResultList = [];

    // api 요청 실패 그룹 존재하면 모아서 다시 시도 ↩️
    while (mobileFailedGroups.length > 0) {
      console.log('10초 타이머…')
      await new Promise(resolve => setTimeout(resolve, 10000));

      // 재요청 홈페이지 중복제거
      const duplicatedFilteredList = mobileFailedGroups.filter((group, idx, arr) =>
          idx === arr.findIndex(x => x.name === group.name)
      );

      console.log('10초 경과. 재시도합니다')
      console.log('재요청보낼 그룹들: ', duplicatedFilteredList)
      const list = await Promise.all(
          duplicatedFilteredList.map((group) => getPageSpeedInsight(group, true))
    );

      failedGroupsResultList.push(...list);
    }

    const filteredMobileResultList = mobileResultList.filter(group => (group !== null || group !== undefined) && group);
    const filteredFailedGroupsResultList = failedGroupsResultList.filter(group => (group !== null || group !== undefined) && group);

    const intgratedResultList = [...filteredMobileResultList, ...filteredFailedGroupsResultList].sort((a, b) => a.index - b.index);

    // console.log('intgratedResultList : ', intgratedResultList)
    console.log('intgratedResultList length : ', intgratedResultList.length)

    // const resultListConvertedJson: string = JSON.stringify(resultList);
    const mobileResultListConvertedJson= JSON.stringify(intgratedResultList);

    // console.log('resultListConvertedJson: ', resultListConvertedJson);
    // console.log('mobileResultListConvertedJson: ', mobileResultListConvertedJson);

    // --------파일 저장 경로
    // const desktopDir = path.join(currentDirPath, 'desktop');
    const mobileDir = path.join(currentDirPath, 'mobile');

    // --------파일 저장
    // desktop
    // fs.writeFile(path.join(desktopDir, 'desktop-result.json'), resultListConvertedJson, (error: any) => {
    //     if (error) {
    //         console.log(`파일을 생성하지 못했습니다. error: ${error.message}`);
    //         return undefined;
    //     } else {
    //         console.log('desktop-result.json 파일 생성 완료')
    //     }
    // });

    // mobile
    fs.writeFile(path.join(mobileDir, 'mobile-result.json'), mobileResultListConvertedJson, (error) => {
      if (error) {
        console.log(`파일을 생성하지 못했습니다. error: ${error.message}`);
        return undefined;
      } else {
        console.log('mobile-result.json 파일 생성 완료')
      }
    });
  } catch (error) {
    console.error('createResultJsonFile 함수 실행에 실패했습니다. error: ', error);
    return undefined;
  }
}

createResultJsonFile();