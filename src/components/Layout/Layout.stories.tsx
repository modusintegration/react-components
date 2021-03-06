import { Story } from "@storybook/react";
import log from "resources/log";
import Layout, { LayoutProps } from "./Layout";

export default {
  title: "Components/Layout",
  component: Layout,
  subcomponents: {
    "Layout.Navbar": Layout.Navbar,
    "Layout.Page": Layout.Page,
    "Layout.SideMenu": Layout.SideMenu,
    "Layout.Content": Layout.Content,
  },
};

const userIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 40 40"
  >
    <g>
      <circle cx="20" cy="20" r="20" fill="#fff" />
    </g>
  </svg>
);

const Template: Story<LayoutProps> = (args) => <Layout {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <Layout.Navbar
        title="Layout"
        username="test"
        onUsernameClick={log}
        userIcon={userIcon}
      />
      <Layout.Content>
        <Layout.SideMenu>Menu</Layout.SideMenu>
        <Layout.Page>Page</Layout.Page>
      </Layout.Content>
    </>
  ),
};

export const ComposingNavbar = () => (
  <Layout.Navbar title="Composing Navbar">
    <Layout.Navbar.Block label="Company" initial="C">
      <Layout.Navbar.Block.Item onClick={log}>Logout</Layout.Navbar.Block.Item>
      <Layout.Navbar.Block.Item onClick={log}>Profile</Layout.Navbar.Block.Item>
    </Layout.Navbar.Block>
    <Layout.Navbar.Block label="User clickable name">
      <Layout.Navbar.Block.Item onClick={log}>Logout</Layout.Navbar.Block.Item>
      <Layout.Navbar.Block.Item onClick={log}>Profile</Layout.Navbar.Block.Item>
    </Layout.Navbar.Block>
  </Layout.Navbar>
);
