import client from './client';
import { colors } from '../common/styles';

interface ChartData {
  name: string;
  value: number;
}

interface PieChartData extends ChartData {
  fill: string;
}

interface GenderResponse {
  male_number: number;
  female_number: number;
  unknow_number: number;
}

interface LevelResponse {
  lv1_number: number;
  lv2_number: number;
  lv3_number: number;
  lv4_number: number;
  lv5_number: number;
  lv6_number: number;
}

interface BiliUserResponse {
  mid: number;
  name: string;
  sex: string;
  sign: string;
  level: string;
  viptype: string;
  following: number;
  fans: number;
}

export interface BilliUserData {
  id: number;
  username: string;
  gender: string;
  sign: string;
  level: number;
  vip: string;
  following: number;
  fans: number;
}

interface PagedResp<T> {
  page: T[];
  total_pages_num: number;
  page_object_num: number;
}

interface PagedData<T> {
  items: T[];
  pageCount: number;
}

const getVipType = (type: string) => {
  switch (type) {
    case '2': return '年度大会员';
    case '1': return '大会员';
    default: return '普通用户';
  }
};

export default class DataApi {
  public static gender(): Promise<PieChartData[]> {
    return client.get<GenderResponse>('getsexnum/').then(({ data }) => [{
      name: '男性',
      value: data.male_number ?? 0,
      fill: colors.blue,
    }, {
      name: '女性',
      value: data.female_number ?? 0,
      fill: colors.pink,
    }, {
      name: '保密',
      value: data.unknow_number ?? 0,
      fill: colors.yellow,
    }]);
  }

  public static level(): Promise<ChartData[]> {
    return client.get<LevelResponse>('getlevelnum/').then(({ data }) => [{
      name: 'LV 1',
      value: data.lv1_number,
    }, {
      name: 'LV 2',
      value: data.lv2_number,
    }, {
      name: 'LV 3',
      value: data.lv3_number,
    }, {
      name: 'LV 4',
      value: data.lv1_number,
    }, {
      name: 'LV 5',
      value: data.lv5_number,
    }, {
      name: 'LV 6',
      value: data.lv6_number,
    }]);
  }

  public static top10(): Promise<BilliUserData[]> {
    return client.get<BiliUserResponse[]>('getmostfans/')
      .then(({ data }) => DataApi.mapBiliUserList(data));
  }

  public static search(query = '', page = 1): Promise<PagedData<BilliUserData>> {
    return client.get<PagedResp<BiliUserResponse>>('search/', {
      params: { keyword: query, page },
    }).then(({ data }) => ({
      items: DataApi.mapBiliUserList(data.page),
      pageCount: data.total_pages_num,
    }));
  }

  private static mapBiliUserList = (data: BiliUserResponse[]) =>
    data.map(({ mid, name, sex, viptype, level, ...rest }) => ({
      id: mid,
      username: name,
      gender: sex,
      level: parseInt(level, 10),
      vip: getVipType(viptype),
      ...rest,
    }));
}
