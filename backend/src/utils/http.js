export class HttpError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}
export const handler = (fn) => (req, res, next) => Promise.resolve(fn(req, res)).catch(next);
const strings=new Set(['title','name','description','intent','content','notes','status','priority','energyLevel','recurrenceRule','avatar','timezone','trigger','action','actionValue','viewType','period','date','currency','severity','meetingLink','notifications']);
const numbers=new Set(['timeEstimate','timeSpent','orderIndex','amount','rating']);
export const pick=(body,fields)=>Object.fromEntries(fields.filter(key=>body[key]!==undefined).map(key=>{
 const value=body[key];if(strings.has(key)&&value!==null&&typeof value!=='string')throw new HttpError(400,key+' must be text');
 if(numbers.has(key)&&value!==null&&(typeof value!=='number'||!Number.isFinite(value)))throw new HttpError(400,key+' must be a finite number');
 if(['published','isActive'].includes(key)&&typeof value!=='boolean')throw new HttpError(400,key+' must be a boolean');
 return [key,value];
}));
export const pagination = (query, defaultLimit = 100) => {
  const page = Number(query.page ?? 1);
  const limit = Number(query.limit ?? defaultLimit);
  if (!Number.isSafeInteger(page) || page < 1 || page > 100000 || !Number.isSafeInteger(limit) || limit < 1 || limit > 200) throw new HttpError(400, 'page must be a positive integer and limit must be between 1 and 200');
  return { page, limit, skip: (page - 1) * limit };
};
