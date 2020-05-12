import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const getItems = (count, offset = 0, mainColor) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${LightenDarkenColor(mainColor, offset + k)}`,
        content: `item ${k + offset}`,
        color: LightenDarkenColor(mainColor, (offset + (k * 7)) * 2)
    }));

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const LightenDarkenColor = (col, amt) => {
    var usePound = false;
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
    var num = parseInt(col, 16);
    var r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if (r < 0) r = 0;
    var b = ((num >> 8) & 0x00FF) + amt;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
    var g = (num & 0x0000FF) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
};

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    const [added] = destClone.splice(droppableDestination.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);
    sourceClone.splice(droppableSource.index, 0, added);
    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle, backgroundColor) => ({
    userSelect: "none",
    border: "1px solid black",
    padding: grid * 2,
    backgroundColor: backgroundColor ? backgroundColor : '#ffffff',
    height: 50,
    ...draggableStyle
});
const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    width: 80
});

function HomeContainer() {
    const [state, setState] = useState([getItems(8, 0, '#FF3333'), getItems(8, 8, '#8B0016'),getItems(8, 16, '#F06D06'),getItems(8, 24, '#3380FF'),getItems(8, 32, '#F904EA'),getItems(8, 40, '#04F934'),getItems(8, 48, '#F9EA04'),getItems(8, 50, '#0EE4E1')]);

    function onDragEnd(result) {
        const { source, destination } = result;
        if (!destination) {
            return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if (sInd === dInd) {
            const items = reorder(state[sInd], source.index, destination.index);
            const newState = [...state];
            newState[sInd] = items;
            setState(newState);
        } else {
            const result = move(state[sInd], state[dInd], source, destination);
            const newState = [...state];
            newState[sInd] = result[sInd];
            newState[dInd] = result[dInd];
            setState(newState.filter(group => group.length));
        }
    }

    return (
        <div style={{ display: "flex" }}>
            <DragDropContext onDragEnd={onDragEnd}>
                {state.map((el, ind) => (
                    <Droppable key={ind} droppableId={`${ind}`}>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                                {...provided.droppableProps}
                            >
                                {el.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style,
                                                    item.color
                                                )}
                                            >
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-around"
                                                    }}
                                                >
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </DragDropContext>
        </div>
    );
}


export default HomeContainer;
