import React from 'react';

export default function DataRow(rowInfo) {
  const isErrorRow = rowInfo.data.msgText && rowInfo.data.msgText.toLowerCase().includes('error');
  const isLog = rowInfo.data.appId && rowInfo.data.appId.toLowerCase().includes('log');

  const rowClassName = `${isErrorRow ? 'errorRow' : ''} ${isLog ? 'logRow' : ''}`.trim();
  console.log(rowClassName);
  return (
    <tr className={rowClassName} role='row'>
      <td role='gridcell'>{rowInfo.data.index}</td>
      <td role='gridcell'>{rowInfo.data.timePC}</td>
      <td role='gridcell'>{rowInfo.data.timeCCU}</td>
      <td role='gridcell'>{rowInfo.data.appId}</td>
      <td role='gridcell'>{rowInfo.data.msgInfo}</td>
      <td role='gridcell'>{rowInfo.data.msgText}</td>
    </tr>
  );
}
