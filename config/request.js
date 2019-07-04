/**
 * 通信配置
 */
let request = {
  key:                  'GhU6G4FK5iiyeCRoLw',
  system:               'wechat',
  version:              'v1',
  group_default:         1, //1个人版 2企业版 3直播视频
  initUrl:              'https://wx.upjob.com.cn/api/v2/login/mini_login',          //登录
  job_list:             'https://wx.upjob.com.cn/api/v2/index/get_index_job_list',  //职位列表
  get_mobile:           'https://wx.upjob.com.cn/api/v2/login/mini_bind_mobile',    //绑定手机
  tags_list:            'https://wx.upjob.com.cn/api/v2/public/benefits_tag_List',  //筛选标签
  hot_search:           'https://wx.upjob.com.cn/api/v2/index/index_search',        //搜索页详情
  screen_list:          'https://wx.upjob.com.cn/api/v2/index/index_screen',        //筛选页详情
  city_list:            'https://wx.upjob.com.cn/api/v2/public/search_city_list',   //城市列表
  salary_range:         'https://wx.upjob.com.cn/api/v2/public/search_salary_List', //薪资列表
  job_type_list:        'https://wx.upjob.com.cn/api/v2/public/job_type_List',      //工种列表
  recruit_datails:      'https://wx.upjob.com.cn/api/v1/recruit_datails',
  company_datails:      'https://wx.upjob.com.cn/api/v1/company_datails',
  evaluate_info:        'https://wx.upjob.com.cn/api/v2/evaluate/evaluate_list_for_organ',
  is_collect:           'https://wx.upjob.com.cn/api/v1/is_collect',
  collection:           'https://wx.upjob.com.cn/api/v1/collection',
  nation_list:          'https://wx.upjob.com.cn/api/v2/public/nation_List',
  is_enroll:            'https://wx.upjob.com.cn/api/v2/register/is_enroll',
  job_details:          'https://wx.upjob.com.cn/api/v2/details/enroll_collect_info',
  education_list:       'https://wx.upjob.com.cn/api/v1/get_education_lists',
  registration:         'https://wx.upjob.com.cn/api/v2/register/wechat_registration_post',
  messages_catalog:     'https://wx.upjob.com.cn/api/v1/messages_catalog',
  messages_list:        'https://wx.upjob.com.cn/api/v1/messages_catalog_list',
  messages_detail:      'https://wx.upjob.com.cn/api/v1/message_detail',
  enroll_list:          'https://wx.upjob.com.cn/api/v2/register/enroll_list',
  confirm_interview:    'https://wx.upjob.com.cn/api/v1/Confirm_interview',
  registration_datails: 'https://wx.upjob.com.cn/api/v2/register/all_job_datails',
  personal_info:        'https://wx.upjob.com.cn/api/v1/user_datails_v2',
  cash_back_details:    'https://wx.upjob.com.cn/api/v2/salary/cash_back_details',
  entry_registration:   'https://wx.upjob.com.cn/api/v2/register/entry_registration',
  getIntroducerList:    'https://wx.upjob.com.cn/api/v1/get_introducer_list',
  banner_list:          'https://wx.upjob.com.cn/api/v1/get_banner_list', //首页banner列表接口
};

module.exports = request;