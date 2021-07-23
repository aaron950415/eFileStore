import React,{useEffect} from "react";
import { useStores } from "../stores";
import InfiniteScroll from "react-infinite-scroller";
import { List, Spin } from "antd";
import styled from "styled-components";
import { observer } from "mobx-react";
const Img = styled.img`
  width: 100px;
  height: 120px;
  object-fit: contain;
  border: 1px solid #eee;
`;
const Component = observer(() => {
  const { HistoryStore } = useStores();
  const loadMore = () => {
    HistoryStore.find();
  };
  useEffect(() => {
    return () => {
      HistoryStore.reset();
    }
  }, []);
  return (
    <div>
      <InfiniteScroll 
        initialLoad={true}
        pageStart={0}
        loadMore={loadMore}
        hasMore={!HistoryStore.isLoading && HistoryStore.hasMore}

      >
        <List
        dataSource={HistoryStore.list}
          renderItem={
              (item) => <List.Item key={item.id}>
              <div>
                <Img
                  height={120}
                  width={100}
                  src={item.attributes.url.attributes.url}
                />
              </div>
              <div>
              <h5>{item.attributes.fileName}
              </h5>
              </div>
              <div>
                   <a  target="_blank" href={item.attributes.url.attributes.url}>{item.attributes.url.attributes.url}</a>

              </div>
            </List.Item>
          }
        >
          {HistoryStore.isLoading && HistoryStore.hasMore && (
            <div>
              <Spin tip="loading" />
            </div>
          )}
        </List>
      </InfiniteScroll>
    </div>
  );
});

export default Component;
