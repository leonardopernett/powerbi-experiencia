import { Router } from 'express'
import { pool } from './database.js'
import axios from 'axios'
import qs from 'qs'

const router = Router()

router.get('/api/experience', async function(req,res){

   const [[ response ]] = await pool.query('SELECT * FROM powerbi_credentials where app=?',['experience learning'])

    const resp = qs.stringify({
      grant_type: response.grant_type,
      resource: response.resource,
      client_id: response.client_id,
      client_secret: response.client_secret,
    })

    const { data } = await axios.request({
      method: 'POST',
      maxBodyLength: Infinity,
      url:'https://login.windows.net/276d3383-2ad4-4f95-b231-1392fb8a0014/oauth2/token',
      data:resp
    })
  
   const { access_token } = data

   try {
      const results = await axios.request({
         method:'GET',
         url:'https://api.powerbi.com/v1.0/myorg/availableFeatures',
         headers:{
            'Authorization': 'Bearer '+ access_token
         }
      }) 
      
      return res.json({
         results: results.data
      })
   } catch (error) {
      return res.json(error)
   }

})

router.get('/api/cxm', async function (req, res) {
   const [[ response ]] = await pool.query('SELECT * FROM powerbi_credentials where app=?',['cxm'])
   
   const value = qs.stringify({
      grant_type: response.grant_type,
      resource: response.resource,
      client_id: response.client_id,
      client_secret: response.client_secret,
   })

   const {data} = await axios.request({
      method: 'POST',
      maxBodyLength: Infinity,
      url:'https://login.windows.net/276d3383-2ad4-4f95-b231-1392fb8a0014/oauth2/token',
      data:value
   })
   const { access_token } = data

   try {
      const results = await axios.request({
         method:'GET',
         url:'https://api.powerbi.com/v1.0/myorg/availableFeatures',
         headers:{
            'Authorization': 'Bearer '+ access_token
         }
      }) 
      
      return res.json({
         results: results.data
      })
   } catch (error) {
      return res.json(error)
   }


})
 
export default router