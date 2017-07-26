import globals from '@/globals';

export default function keyFilter(item, key) {
  key = key || globals.sysPrimaryKey;
  var filter = {};
  filter[key] = item[key];
  return filter;
};
