export default function GoogleLogout() {
  function handleSignOut() {
    setUser({});
  }
  return (
    <>
      {Object.keys(user).length !== 0 && (
        <button onClick={e => handleSignOut(e)}>Sign Out</button>
      )}
    </>
  );
}
