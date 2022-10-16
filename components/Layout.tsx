export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header>헤더</header>
      {children}
    </div>
  );
};
