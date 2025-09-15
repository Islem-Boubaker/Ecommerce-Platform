function BrowseByStyle() {
    const styles = [
        { id: 1, name: "Casual", image: "https://via.placeholder.com/150" },
        { id: 2, name: "Formal", image: "https://via.placeholder.com/150" },
        { id: 3, name: "Gym", image: "https://via.placeholder.com/150" },
        { id: 4, name: "Party", image: "https://via.placeholder.com/150" },
    ];
    return (
        <div>
            <h2>Browse By Style</h2>
            <div className="gird grid-cols-1 gap-4 rounded-2xl bg-gray-200 md:grid-cols-2 ">
                {styles.map((style) => (
                    <div key={style.id}>
                        <img src={style.image} alt={style.name} />
                        <h3>{style.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default BrowseByStyle;