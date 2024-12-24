function ExtraTab() {
  return (
    <div className="extra">
       <div className="search-tab">
        <input placeholder="Search"/>

        <div className="suggested-users">
            <h2>Suggested Users</h2>
            <div className="sugg-user">
                <div className="suggested-user-details">
                    <h3>Username</h3>
                    <p>Biography</p>
                </div>

                <button>Follow</button>
            </div>
        </div>
       </div>
    </div>
  )
}

export default ExtraTab