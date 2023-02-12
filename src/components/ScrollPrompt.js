import classes from "../../src/assets/css/scrollPrompt.module.scss"

const ScrollPrompt = () => {
  return (
    <div className={classes.scrollPromptContainer}>
      <div className={classes.prompt}>
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40.05px" height="35.69px" viewBox="-8.369 -3.009 40.05 35.69" enableBackground="new -8.369 -3.009 40.05 35.69" xmlSpace="preserve" className={classes["svg-scroll"]}>
          <g>
            <path d="M12.406,32.394l7.6-7.601l0,0l11.301-11.2c0.5-0.5,0.5-1.199,0-1.699l-2.301-2.301c-0.5-0.5-1.199-0.5-1.699,0l-14.9,14.9
		c-0.5,0.5-1.2,0.5-1.701,0l-14.8-14.9c-0.5-0.5-1.2-0.5-1.7,0l-2.199,2.2c-0.5,0.5-0.5,1.2,0,1.7l11.199,11.2l0,0l7.601,7.6
		C11.206,32.793,12.006,32.793,12.406,32.394"/>
            <path d="M12.031,8.565l3.795-3.795l0,0l5.643-5.593c0.25-0.25,0.25-0.599,0-0.849L20.32-2.821c-0.25-0.25-0.599-0.25-0.849,0
		L12.031,4.62c-0.25,0.25-0.599,0.25-0.849,0L3.791-2.821c-0.25-0.25-0.599-0.25-0.849,0L1.844-1.723c-0.25,0.25-0.25,0.6,0,0.849
		L7.436,4.72l0,0l3.795,3.795C11.431,8.764,11.831,8.764,12.031,8.565"/>
          </g>
        </svg>
      </div>
    </div>
  );
}

export default ScrollPrompt;