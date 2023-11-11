import './Loader.styles.scss';

const Loader = (props: React.PropsWithChildren) => (
  <div className="custom-loader">
    <div className="custom-loader__loading-circle">
      <div></div>
    </div>

    {props.children ?? (
      <div>
        Loading,
        <br />
        please wait ...
      </div>
    )}
  </div>
);

export default Loader;
