/* eslint-disable @typescript-eslint/no-unused-vars */
import { parse } from 'querystring';
import moment from 'moment';
import pathRegexp from 'path-to-regexp';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = (path) => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const { NODE_ENV } = window.__RUNTIME_CONFIG__;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
export const getPageQuery = () => parse(window.location.href.split('?')[1]);
/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */

export const getAuthorityFromRouter = (router = [], pathname) => {
  const authority = router.find(
    ({ routes, path = '/', target = '_self' }) =>
      (path && target !== '_blank' && pathRegexp(path).exec(pathname)) ||
      (routes && getAuthorityFromRouter(routes, pathname)),
  );
  if (authority) return authority;
  return undefined;
};
export const getRouteAuthority = (path, routeData) => {
  let authorities;
  routeData.forEach((route) => {
    // match prefix
    if (pathRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
      if (route.authority) {
        authorities = route.authority;
      } // exact match

      if (route.path === path) {
        authorities = route.authority || authorities;
      } // get children authority recursively

      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

// Custom utils
export const buildParams = ({ current, pageSize }, sorter, formData) => {
  // build filters
  const filters = {};
  Object.entries(formData).forEach(([key, value]) => {
    if (value) {
      filters[`${key}`] = value;
    }
  });
  // build sort
  let sort;
  if (sorter && sorter.field) {
    sort = `${sorter.field},${sorter.order === 'ascend' ? 'ascend' : 'descend'}`;
  }

  return {
    page: current,
    size: pageSize,
    sort,
    ...filters,
  };
};

export const getImgUrl = (imageName) =>
  `https://${window.__RUNTIME_CONFIG__.S3_BUCKETNAME}.s3.${window.__RUNTIME_CONFIG__.S3_REGION}.amazonaws.com${window.__RUNTIME_CONFIG__.S3_DIRECTORY}/${imageName}`;

export const buildParamsWithPro = (
  { current, pageSize, ...keywords },
  sorter = {},
  filters = {},
) => {
  // build filters
  const search = {};
  if (!!keywords) {
    Object.entries(keywords).forEach(([key, value]) => {
      if (value != null) {
        search[`${key}`] = value;
      }
    });
  }
  // build sort
  let sort;
  if (sorter && sorter.field) {
    sort = `${sorter.field},${sorter.order === 'ascend' ? 'ascend' : 'descend'}`;
  }

  return {
    page: current,
    size: pageSize,
    sort,
    ...search,
  };
};

// get Cookie
export const setCookie = (cname, cvalue, expireDay = 10) => {
  const d = new Date();
  d.setTime(d.getTime() + expireDay * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
};

export const getCurrentStore = () => localStorage.getItem('CURRENT_STORE');
export const getCurrentArticleType = () => localStorage.getItem('CURRENT_ARTICLE_TYPE');

// set Cookie
export const getCookie = (cname) => {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};
// delete all cookies
export const deleteAllCookie = () => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i += 1) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  }
};

// set localstorage
export const setLocalStorage = (name, value) => {
  localStorage.setItem(name, value);
};

// get localstorage
export const getLocalStorage = (name) => localStorage.getItem(name);
//
export const removeLocalStorage = (key) => localStorage.removeItem(key);

export const saveCollections = (data) => localStorage.setItem('COLLECTIONS', JSON.stringify(data));
export const getCollections = () => localStorage.getItem('COLLECTIONS');

export const removeUserInfo = () => localStorage.removeItem('USER_INFO');
export const setUserInfo = (userInfo) => setLocalStorage('USER_INFO', JSON.stringify(userInfo));
export const getUserInfo = () => getLocalStorage('USER_INFO');

export const removeAppToken = (token) => localStorage.removeItem('APP_TOKEN');
export const setAppToken = (token) => setLocalStorage('APP_TOKEN', token);
export const getAppToken = () => getLocalStorage('APP_TOKEN');

export const getCollectionById = (id) => {
  const collections = JSON.parse(getCollections());
  if (collections) {
    return collections.find((col) => col.id == id);
  }
};

export const daysInWeek = [
  'Thứ hai',
  'Thứ ba',
  'Thứ tư',
  'Thứ năm',
  'Thứ sáu',
  'Thứ bảy',
  'Chủ nhật',
];

export const DATE_FORMAT = 'DD/MM/YYYY';

export const convertStrToDate = (string, format = DATE_FORMAT) => {
  return moment(string, format);
};

export const convertDateToStr = (date, format = DATE_FORMAT) => {
  return moment(date).isValid() ? moment(date).format(format).toString() : '-';
};

export const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

export const normalizeImg = ([firstImg]) => {
  const { response } = firstImg || {};
  return response;
};

export const renderDayMenu = (dayFilter = []) => dayFilter?.map((dayIndex) => daysInWeek[dayIndex]);

export const normalizeProductForm = (formData) => {
  const update = { ...formData } || {};
  update.size =
    formData?.size != null && Array.isArray(formData.size) ? formData.size.join(',') : null;
  update.base =
    formData?.base != null && Array.isArray(formData.base) ? formData.base.join(',') : null;

  update.size = update?.size?.trim() != '' ? update?.size?.trim() : null;
  update.base = update?.base?.trim() != '' ? update?.base?.trim() : null;

  update.pic_url =
    formData?.pic_url != null && Array.isArray(formData?.pic_url)
      ? normalizeImg(formData?.pic_url)
      : formData?.pic_url;

  update.pic_url =
    formData?.pic_url != null && Array.isArray(formData?.pic_url)
      ? normalizeImg(formData?.pic_url)
      : formData?.pic_url;

  // update default min max
  update.groups = update.groups?.map((group) => {
    group.default_min_max = `${group.default}-${group.min}-${group.max}`;
    group.product_childs = group.product_childs?.map((prod) => {
      prod.default_min_max = `${prod.default}-${prod.min}-${prod.max}`;
      return prod;
    });
    return group;
  });

  return {
    ...update,
    // attributes: update.attributes || [],
    attributes: [],
    display_order: 1,
  };
};

export const stringToSlug = str => {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
  var to = 'aaaaeeeeiiiioooouuuunc------';
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
};


export const makeTextFile = (text) => {
  const data = new Blob([text], { type: 'text/plain' });
  let textFile;
  // If we are replacing a previously generated file we need to
  // manually revoke the object URL to avoid memory leaks.
  // if (textFile !== null) {
  //   window.URL.revokeObjectURL(textFile);
  // }

  textFile = window.URL.createObjectURL(data);

  return textFile;
};

export const downloadFileFromText = (strData, strFileName, strMimeType = 'text/plain') => {
  var D = document,
    A = arguments,
    a = D.createElement('a'),
    d = A[0],
    n = A[1],
    t = A[2] || 'text/plain';

  //build download link:
  a.href = 'data:' + strMimeType + 'charset=utf-8,' + escape(strData);

  if (window.MSBlobBuilder) {
    // IE10
    var bb = new MSBlobBuilder();
    bb.append(strData);
    return navigator.msSaveBlob(bb, strFileName);
  } /* end if(window.MSBlobBuilder) */

  if ('download' in a) {
    //FF20, CH19
    a.setAttribute('download', strFileName);
    a.innerHTML = 'downloading...';
    D.body.appendChild(a);
    setTimeout(function () {
      var e = D.createEvent('MouseEvents');
      e.initMouseEvent(
        'click',
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null,
      );
      a.dispatchEvent(e);
      D.body.removeChild(a);
    }, 66);
    return true;
  } /* end if('download' in a) */

  //do iframe dataURL download: (older W3)
  var f = D.createElement('iframe');
  D.body.appendChild(f);
  f.src =
    'data:' +
    (A[2] ? A[2] : 'application/octet-stream') +
    (window.btoa ? ';base64' : '') +
    ',' +
    (window.btoa ? window.btoa : escape)(strData);
  setTimeout(function () {
    D.body.removeChild(f);
  }, 333);
  return true;
};

export const readTextFromFile = (file, onLoad = () => null) => {
  console.log(`readFile`, file);
  if (file) {
    var reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = function (evt) {
      onLoad(evt.target.result);
    };
    reader.onerror = function (evt) {
      console.log('error reading file');
    };
  }
};

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const removeColumnIndex = (columns = [], removeIndexs = []) => {
  return columns.filter((col) => !removeIndexs.some((key) => key == col.dataIndex))
}

export const formatCurrency = (amount) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

export function arrayMove(array, from, to) {
  const newArray = array.slice();
  newArray.splice(to < 0 ? newArray.length + to : to, 0, newArray.splice(from, 1)[0]);

  return newArray;
}

export function restrictToBoundingRect(transform, rect, boundingRect) {
  const value = {
    ...transform,
  };

  if (rect.top + transform.y <= boundingRect.top) {
    value.y = boundingRect.top - rect.top;
  } else if (rect.bottom + transform.y >= boundingRect.top + boundingRect.height) {
    value.y = boundingRect.top + boundingRect.height - rect.bottom;
  }

  if (rect.left + transform.x <= boundingRect.left) {
    value.x = boundingRect.left - rect.left;
  } else if (rect.right + transform.x >= boundingRect.left + boundingRect.width) {
    value.x = boundingRect.left + boundingRect.width - rect.right;
  }

  return value;
}

export const restrictToFirstScrollableAncestor = ({
  transform,
  activeNodeRect,
  scrollableAncestorRects,
}) => {
  const firstScrollableAncestorRect = scrollableAncestorRects[0];

  if (!activeNodeRect || !firstScrollableAncestorRect) {
    return transform;
  }

  return restrictToBoundingRect(transform, activeNodeRect, firstScrollableAncestorRect);
};

export const getAttributesWithLang = (attrKeys = [], lang = 'vn') => {
  return attrKeys.filter((attr) => attr == 'size' || attr == (lang === 'vn' ? 'base' : 'base_en'));
};
