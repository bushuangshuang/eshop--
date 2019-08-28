/**
 * 引入fetch、baseUrl
 * @param params
 * @returns {*}
 */
// import
import {fetch, baseUrl} from 'config/index'
// 获取验证码
export function TestGetCode(params) {
  return fetch(`${baseUrl}/login/getVerifyCode`, params)
}
// 登录
export function Login(params) {
  return fetch(`${baseUrl}/login/action`, params)
}
// 买车方案的接口
export function buycar(params) {
  return fetch(`${baseUrl}/assets/json/shopcar.json`, params)
}
// 车型列表
export function motorcycle(params) {
  return fetch(`${baseUrl}/carType/getAllCars`, params)
}
// 查询车系分页列表信息
export function selectCarSeriesPage(params) {
  return fetch(`${baseUrl}/carSeries/loadData`, params)
}
// 车型明细
export function ModelsInDetail(params) {
  return fetch(`${baseUrl}/carType/getCarInfoByCarId`, params)
}
// 车型明细选择颜色
export function selectColor(params) {
  return fetch(`${baseUrl}/carType/getCarColorInfo`, params)
}
// 车型明细在售停产
export function getOnSaleList(params) {
  return fetch(`${baseUrl}/carType/getCarClassification`, params)
}
// 添加购物车
export function addcar(params) {
  return fetch(`${baseUrl}/tShoppingCart/add`, params)
}
// 车型明细推荐车系
export function Recommended(params) {
  return fetch(`${baseUrl}/carSeries/loadData`, params)
}
// 订单列表
export function orderList(params) {
  return fetch(`${baseUrl}/order/loadData`, params)
}
// 数据字典
export function loadDataByType(params) {
  return fetch(`${baseUrl}/websiteData/loadDataByType`, params)
}
// 添加收藏
export function AddCollection(params) {
  return fetch(`${baseUrl}/tCollect/add`, params)
}
export function cancelCollection(params) {
  return fetch(`${baseUrl}/tCollect/cancel`, params)
}
// 门店列表
export function getAllDealersByCarId(params) {
  return fetch(`${baseUrl}/carType/getAllDealersByCarId`, params)
}
// 立即下单
export function addOrder(params) {
  return fetch(`${baseUrl}/order/addOrder`, params)
}
// 获取金融服务下拉
export function getFinanceType(params) {
  return fetch(`${baseUrl}/carType/getFinanceTypeByCarProductCd`, params)
}
// 车库
export function getgarage(params) {
  return fetch(`${baseUrl}/garage/loadData`, params)
}
// 上传文件
export function uploadFile(params) {
  return fetch(`${baseUrl}/common/upload`, params)
}
// 实名认证
export function realName(params) {
  return fetch(`${baseUrl}/userInfo/saveUserInfo`, params)
}
// 获取个人信息
export function getPersonInfo() {
  return fetch(`${baseUrl}/userInfo/getPersonInfo`)
}
// 获取参数配置
export function parameter(params) {
  return fetch(`${baseUrl}/carType/getCarDetailPage`, params)
}
// 购物车列表
export function shopcarlist(params) {
  return fetch(`${baseUrl}/tShoppingCart/loadData`, params)
}
// 车辆对比
export function Vehiclecontrast(params) {
  return fetch(`${baseUrl}/carType/getCarComparison`, params)
}
// tbox数据
export function queryMyTbox(params) {
  return fetch(`${baseUrl}/tBox/queryMyTbox`, params)
}
// 车辆 银行卡 贷款
export function getdayinfo(params) {
  return fetch(`${baseUrl}/userInfo/getCountData`, params)
}
// 购物车删除
export function deleteCar(params) {
  return fetch(`${baseUrl}/tShoppingCart/batchDelete`, params)
}
// 金融产品
export function financeClasses(params) {
  return fetch(`${baseUrl}/financeClasses/findById`, params)
}
// 收藏夹文章
export function gettArticle(params) {
  return fetch(`${baseUrl}/tCollect/loadData`, params)
}
// 收藏夹获取车辆
export function Collectionvehicles(params) {
  return fetch(`${baseUrl}/tCollect/loadData`, params)
}
// 申请退款
export function drawback(params) {
  return fetch(`${baseUrl}/order/makeRefund`, params)
}
// 更新个人信息
export function updateperson(params) {
  return fetch(`${baseUrl}/userInfo/modifyPersonalInfo`, params)
}
// 撤销退款
export function revoke(params) {
  return fetch(`${baseUrl}/order/cancelRefund`, params)
}
// 继续支付（6,8）
export function orderPayOfBail(params) {
  return fetch(`${baseUrl}/order/orderPayOfBail`, params)
}
// 继续支付（7,11）
export function orderPayOfBalance(params) {
  return fetch(`${baseUrl}/order/orderPayOfBalance`, params)
}
// 订单详情
export function orderinfo(params) {
  return fetch(`${baseUrl}/order/findOrderById`, params)
}
// 好友推荐
export function tShoppingCart(params) {
  return fetch(`${baseUrl}/tShoppingCart/friendRecommend`, params)
}
export function recommended(params) {
  return fetch(`${baseUrl}/tShoppingCart/add`, params)
}
// 文章列表
export function article(params) {
  return fetch(`${baseUrl}/tArticle/loadData`, params)
}
// 删除订单
export function deleteorder(params) {
  return fetch(`${baseUrl}/order/deleteOrder`, params)
}
// 用户验车
export function checkcaroperatio(params) {
  return fetch(`${baseUrl}/order/userVehicleInspection`, params)
}
// 退出登录
export function loginout(params) {
  return fetch(`${baseUrl}/login/logout`, params)
}
// 获取企业电话
export function getConsultingPhone(params) {
  return fetch(`${baseUrl}/userInfo/getConsultingPhone`, params)
}
// 获取购物车详情
export function getShoppingDetail(params) {
  return fetch(`${baseUrl}/tShoppingCart/getShoppingItemDetail`, params)
}
// 协议支付签约申请接口
export function suNingPay(params) {
  return fetch(`${baseUrl}/suNingPay/sign`, params)
}
// 协议支付签约确认接口
export function suNingconfirm(params) {
  return fetch(`${baseUrl}/suNingPay/confirm`, params)
}
// 邀请好友下载app
export function inviteFrien(params) {
  return fetch(`${baseUrl}/userInfo/inviteFriend`, params)
}
