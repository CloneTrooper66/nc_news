import "ldrs/leapfrog";

export default function Loading() {
  return (
    <>
      <h2>Please Wait</h2>
      <div className="loader">
        <l-leapfrog size="100" speed="2.5" color="black"></l-leapfrog>
      </div>
    </>
  );
}
