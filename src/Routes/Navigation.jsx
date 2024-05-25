import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { map } from 'lodash'
import routes from './routes'
export const Navigation= () => {
    return (
        <Router>
            <Routes>
                {map(routes, (route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <route.layout>
                                <route.component />
                            </route.layout>
                        }
                    />
                ))}
            </Routes>
        </Router>
    )
}