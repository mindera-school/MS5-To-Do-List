import React from "react";
import CreateTasksContainer from "../components/AddTasks/CreateTasksContainer";
import Header from "../components/Header";
import LeftMenu from "../components/LeftMenu";
import TaskList from "../components/TaskList";
import { CentralDiv, LateralDiv, Main, TaskListContainer } from "../GlobalStyles";

function Home(tasksListContext, theme) {
	return <>
		<Header tasksList={tasksListContext} />
		<Main className="main">
			<LateralDiv>
				<LeftMenu />
			</LateralDiv>
			<CentralDiv className="central">
				<CreateTasksContainer />
				<TaskListContainer className="tasklistcont" theme={theme}>
					<TaskList />
				</TaskListContainer>
			</CentralDiv>
			<LateralDiv dummy={true} />
		</Main>
	</>;

}

export default Home;
