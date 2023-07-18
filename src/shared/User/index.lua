local user = {}

local functions = {}

function user.new(player)
	local self = {
		Instance = player,
		Gold = 0,
		Diamonds = 0,
		Level = 0,
		Experience = 0,
	}

	local mt = {
		__index = function(_, i)
			local item = player[i]

			if typeof(item) == "function" then
				error(`Indexing functions is not supported`)
			end

			return item
		end,
		__tostring = "User",
	}

	function self:GetNetworkPing()
		return self.Instance:GetNetworkPing()
	end

	setmetatable(self, mt)

	return self
end

return user;