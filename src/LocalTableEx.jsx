import React, { useCallback, useEffect, useRef, useState } from 'react';
import DataGrid, {
  Scrolling,
  Sorting,
  LoadPanel,
  HeaderFilter,
  Search,
  FilterRow,
  Paging,
  Column,
} from 'devextreme-react/data-grid';
import { generateData } from './tableData.js';
import { Button, ScrollView } from 'devextreme-react';

const customizeColumns = (columns) => {
  columns[0].width = 70;
};

const LocalTableEx = () => {
  const getDataCount = 10000;
  const [loadPanelEnabled, setLoadPanelEnabled] = useState(true);
  const dataGridRef = useRef(null);
  const [focusedRowKey, setFocusedRowKey] = useState(null);
  const [autoNavigateToFocusedRow, setAutoNavigateToFocusedRow] = useState(true);
  const [isAddingData, setIsAddingData] = useState(false);
  const intervalRef = useRef(null);
  const [lastIndex, setLastIndex] = useState(0);
  const [dataSource, setDataSource] = useState([]);

  const addData = useCallback(() => {
    setDataSource((prevData) => {
      const newData = generateData(lastIndex, getDataCount);
      setLastIndex(lastIndex + getDataCount);
      return [...prevData, ...newData];
    });
  }, [lastIndex]);

  useEffect(() => {
    if (isAddingData) {
      intervalRef.current = setInterval(addData, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isAddingData, addData]);

  useEffect(() => {
    if (dataSource.length > 0) {
      const lastKey = dataSource[dataSource.length - 1].index;
      setFocusedRowKey(lastKey);
    }
  }, [dataSource]);

  const getScrollable = useCallback(() => {
    const scrollable = dataGridRef.current?.instance()?.getScrollable();
    console.log(scrollable);
  }, [dataGridRef]);

  const onContentReady = useCallback(() => {
    setLoadPanelEnabled(false);
  }, []);

  const handleButtonClick = () => {
    setIsAddingData((prev) => !prev);
  };

  const onFocusedRowChanged = useCallback(
    (e) => {
      console.log('dd', e);
      if (isAddingData) {
        setLastIndex(e.row.data.index);
      } else if (e.row.key) {
        setFocusedRowKey(e.row.key);
      }
    },
    [isAddingData],
  );

  return (
    <>
      <DataGrid
        ref={dataGridRef}
        height={440}
        dataSource={dataSource}
        keyExpr='index'
        showBorders={true}
        onContentReady={onContentReady}
        focusedRowEnabled={true}
        focusedRowKey={focusedRowKey}
        autoNavigateToFocusedRow={autoNavigateToFocusedRow}
        onFocusedRowChanged={onFocusedRowChanged}
      >
        <FilterRow visible={true} applyFilter='auto' />
        <Sorting mode='none' />
        <Scrolling mode='virtual' showScrollbar='always' scrollByContent={false} />
        <LoadPanel enabled={loadPanelEnabled} />
        <Column dataField='index' width={70} />
        <Column dataField='timePC' />
        <Column dataField='timeCCU' />
        <Column dataField='appId' />
        <Column dataField='msgInfo' />
        <Column dataField='msgText' />
      </DataGrid>
      <Button onClick={handleButtonClick}>{isAddingData ? '중지' : '시작'}</Button>
    </>
  );
};

export default LocalTableEx;
