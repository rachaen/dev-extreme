// https://js.devexpress.com/React/Documentation/ApiReference/UI_Components/dxDataGrid/Methods/#getScrollable

import React, { useCallback, useEffect, useRef, useState } from 'react';
import DataGrid, {
  Scrolling,
  Sorting,
  LoadPanel,
  HeaderFilter,
  Search,
  FilterRow,
  Paging,
} from 'devextreme-react/data-grid';
import { generateData } from './tableData.js';
import { ScrollView } from 'devextreme-react';
const customizeColumns = (columns) => {
  columns[0].width = 70;
};

const LocalTableEx = () => {
  const [dataSource, setDataSource] = useState(generateData(100));
  const [loadPanelEnabled, setLoadPanelEnabled] = useState(true);
  const dataGridRef = useRef(null);
  const [focusedRowKey, setFocusedRowKey] = useState(100);
  const [autoNavigateToFocusedRow, setAutoNavigateToFocusedRow] = useState(true);

  const addData = useCallback(() => {
    setDataSource((prevData) => [...prevData, ...generateData(100)]);
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     addData();
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, [addData]);

  useEffect(() => {
    if (dataGridRef.current) {
      // console.log(dataGridRef.current.instance().getScrollable());
    }
    const lastKey = dataSource[dataSource.length - 1].id;
    setFocusedRowKey(lastKey);
  }, [dataSource]);

  const getScrollable = useCallback(() => {
    const scrollable = dataGridRef.current.instance().getScrollable();
    console.log(scrollable);
  }, [dataGridRef]);

  const onContentReady = useCallback(() => {
    setLoadPanelEnabled(false);
  }, []);

  const onFocusedRowChanging = useCallback(async (e) => {
    console.log(e);
    const index = e.newRowIndex;
    console.log(e.rows[index].key);
    setFocusedRowKey(e.rows[index].key);
    setFocusedRowKey(e.newRowIndex);
  }, []);

  const onFocusedRowChanged = useCallback((e) => {
    const data = e.row.data;
    const progress = data.Task_Completion ? `${data.Task_Completion}%` : '';
    setFocusedRowKey(e.component.option('focusedRowKey'));
  }, []);

  return (
    <DataGrid
      ref={dataGridRef}
      height={440}
      dataSource={dataSource}
      keyExpr='id'
      showBorders={true}
      onContentReady={onContentReady}
      focusedRowEnabled={true}
      focusedRowKey={focusedRowKey}
      autoNavigateToFocusedRow={autoNavigateToFocusedRow}
      onFocusedRowChanging={onFocusedRowChanging}
      onFocusedRowChanged={onFocusedRowChanged}
    >
      <Paging defaultPageSize={1000} />
      <FilterRow visible={true} applyFilter='auto' />
      <Sorting mode='none' />
      <Scrolling mode='standard' showScrollbar='always' onScroll={(e) => console.log(e)} scrollByContent={false} />
      <LoadPanel enabled={loadPanelEnabled} />
    </DataGrid>
  );
};
export default LocalTableEx;
