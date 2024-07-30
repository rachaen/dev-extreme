let s = 123456789;
function random() {
  s = (1103515245 * s + 12345) % 2147483647;
  return s % (10 - 1);
}

export function generateData(startIndex, count) {
  let i;
  const appIds = ['ECU', 'APP', 'LOG'];
  const msgInfos = ['CON', 'TES1', 'TES2'];
  const msgTexts = ['Hello world', 'control request', 'log info', 'set_default_log_level', 'log error'];
  const items = [];
  const startPCDate = Date.parse('1/1/2011');
  const endPCDate = Date.parse('1/1/2012');

  for (i = startIndex; i < startIndex + count; i += 1) {
    const timePC = new Date(startPCDate + Math.floor((random() * (endPCDate - startPCDate)) / 10));
    const timeCCU = (random() * 1000000).toFixed(4);
    const appIdIndex = random();
    const msgInfoIndex = random();
    const msgTextIndex = random();
    const item = {
      index: i + 1,
      timePC: timePC.toISOString().replace('T', ' ').replace('Z', ''), // 'YYYY-MM-DD HH:MM:SS.sss'
      timeCCU: timeCCU,
      appId: appIds[appIdIndex],
      msgInfo: msgInfos[msgInfoIndex],
      msgText: msgTexts[msgTextIndex],
    };
    items.push(item);
  }
  return items;
}
