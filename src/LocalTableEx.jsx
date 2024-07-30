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
  SearchPanel,
} from 'devextreme-react/data-grid';
import { generateData } from './tableData.js';
import { Button, ScrollView } from 'devextreme-react';
import DataRow from './DataRow.jsx';

const LocalTableEx = () => {
  const getDataCount = 1000;
  const [loadPanelEnabled, setLoadPanelEnabled] = useState(true);
  const dataGridRef = useRef(null);
  const [focusedRowKey, setFocusedRowKey] = useState(null);
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

  const onContentReady = useCallback(() => {
    setLoadPanelEnabled(false);
  }, []);

  const handleButtonClick = () => {
    setIsAddingData((prev) => !prev);
  };

  // const onFocusedRowChanged = useCallback(
  //   (e) => {
  //     console.log(e);
  //     if (isAddingData && e.row.data) {
  //       setLastIndex(e.row.data.index);
  //     } else if (e.row.key) {
  //       setFocusedRowKey(e.row.key);
  //     }
  //   },
  //   [isAddingData],
  // );

  const onRowClick = (e) => {
    console.log(e);
    setFocusedRowKey(e.key);
  };

  return (
    <>
      <DataGrid
        id='gridContainer'
        ref={dataGridRef}
        dataSource={dataSource}
        keyExpr='index'
        showBorders={true}
        onContentReady={onContentReady}
        focusedRowEnabled={true}
        focusedRowKey={focusedRowKey}
        // onFocusedRowChanged={onFocusedRowChanged}
        dataRowRender={DataRow}
        onRowClick={onRowClick}
        height={500}
      >
        <SearchPanel visible={true} highlightCaseSensitive={true} />
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
