import request from '../utils/request';

export function getArr() {
  return { content: ['haha', 'happiness', 'hope'] };
}
export function getAllEquips() {
  return request('http://10.30.20.42:18888/equip/get-all', { method: 'GET' });
}
